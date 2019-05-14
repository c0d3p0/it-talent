package com.iorix2k2.ittalent.frontend.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class FrontendService
{
	public String executeGet(String serviceName, String followingUrl)
	{
		return executeRequest(serviceName, followingUrl, null, HttpMethod.GET);
	}
	
	public String executePost(String serviceName, String followingUrl, Resource resource)
	{
		return executeRequest(serviceName, followingUrl, resource, HttpMethod.POST);
	}

	public String executePut(String serviceName, String followingUrl, Resource resource)
	{
		return executeRequest(serviceName, followingUrl, resource, HttpMethod.PUT);
	}

	public String executeDelete(String serviceName, String followingUrl, Resource resource)
	{
		return executeRequest(serviceName, followingUrl, resource, HttpMethod.DELETE);
	}

	public String executeRequest(String serviceName, String followingUrl, Resource resource, HttpMethod httpMethod)
	{
		String url = serviceMap.get(serviceName) + followingUrl;
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<Resource> request = new HttpEntity<>(resource, headers);
		return restTemplate.exchange(url, httpMethod, request, String.class).getBody();
	}

	public FrontendService()
	{
		initServiceMap();
	}
	
	private void initServiceMap()
	{
		serviceMap = new HashMap<>();
		serviceMap.put("person", "http://it-talent-person-service/api/person");
		serviceMap.put("skill", "http://it-talent-skill-service/api/skill");
		serviceMap.put("person-skill", "http://it-talent-person-skill-service/api/person-skill");
	}
	
	
	@Autowired
	private RestTemplate restTemplate;
	
	private Map<String, String> serviceMap;
}
