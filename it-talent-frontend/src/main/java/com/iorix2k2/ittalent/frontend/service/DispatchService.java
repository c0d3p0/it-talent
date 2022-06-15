package com.iorix2k2.ittalent.frontend.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.iorix2k2.ittalent.frontend.util.HttpUtil;


@Service
public class DispatchService
{	
	public <T> ResponseEntity<T> dispatch(String url, HttpMethod method,
			HttpServletRequest request, Class<T> responseType)
	{
		return dispatch(url, method, request, responseType, null);
	}
	
	public <T> ResponseEntity<T> dispatch(String url, HttpMethod method,
			HttpServletRequest request, Class<T> responseType, Object param)
	{
		HttpHeaders headers = HttpUtil.getHeadersFromRequest(request);
		Resource body = HttpUtil.getBodyFromRequest(request);
		return dispatch(url, method, headers, body, responseType, param);
	}
	
	public <T> ResponseEntity<T> dispatch(String url, HttpMethod method,
			HttpHeaders headers, Resource body, Class<T> responseType, Object param)
	{
		HttpEntity<Resource> he = new HttpEntity<>(body, headers);
		return restTemplate.exchange(url, method, he, responseType, param);
	}
	
	
	@Autowired
	private RestTemplate restTemplate;
}