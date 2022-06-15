package com.iorix2k2.ittalent.frontend.service;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.iorix2k2.ittalent.frontend.util.HttpUtil;


@Service
public class FrontendService
{
	public FrontendService()
	{
		createServiceUrlMap();
	}

	public ResponseEntity<String> executeRequest(String serviceName, HttpMethod method,
			HttpServletRequest request)
	{
		String url = serviceUrlMap.get(serviceName);
		
		if(url != null)
		{
			return dispatchService.dispatch(url + HttpUtil.getURLSuffix(request),
					method, request, String.class);
		}
		
		throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
				"Couldn't find the service requested!");
	}
	
	private void createServiceUrlMap()
	{
		serviceUrlMap = new HashMap<>();
		serviceUrlMap.put("person", "http://it-talent-person-service/api/person");
		serviceUrlMap.put("skill", "http://it-talent-skill-service/api/skill");
		serviceUrlMap.put("person-skill", "http://it-talent-person-skill-service/api");
	}
	
	
	@Autowired
	private DispatchService dispatchService;
	
	private Map<String, String> serviceUrlMap;
}
