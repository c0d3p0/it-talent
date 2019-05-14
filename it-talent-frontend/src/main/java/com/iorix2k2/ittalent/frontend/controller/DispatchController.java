package com.iorix2k2.ittalent.frontend.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.resource.ResourceUrlProvider;

import com.iorix2k2.ittalent.frontend.service.FrontendService;

@RestController
@RequestMapping("/frontend")
public class DispatchController
{
	@RequestMapping(value="/{serviceName}/**", method = RequestMethod.GET)
	public String executeGet(@PathVariable String serviceName, HttpServletRequest request)
	{
		return frontendService.executeGet(serviceName, getRestOfUrl(request));
	}

	@RequestMapping(value="/{serviceName}/**", method = RequestMethod.POST)
	public String executePost(@PathVariable String serviceName, HttpServletRequest request)
	{
		Resource bodyResource = getBodyAsResource(request);
		return frontendService.executePost(serviceName, getRestOfUrl(request), bodyResource);
	}

	@RequestMapping(value="/{serviceName}/**", method = RequestMethod.PUT)
	public String executePut(@PathVariable String serviceName, HttpServletRequest request)
	{
		Resource bodyResource = getBodyAsResource(request);
		return frontendService.executePut(serviceName, getRestOfUrl(request), bodyResource);
	}

	@RequestMapping(value="/{serviceName}/**", method = RequestMethod.DELETE)
	public String executeDelete(@PathVariable String serviceName, HttpServletRequest request)
	{
		Resource bodyResource = getBodyAsResource(request);
		return frontendService.executeDelete(serviceName, getRestOfUrl(request), bodyResource);
	}
	
	private String getRestOfUrl(HttpServletRequest request)
	{
	    ResourceUrlProvider urlProvider = (ResourceUrlProvider) request
	    		.getAttribute(ResourceUrlProvider.class.getCanonicalName());
		
	    return "/" + urlProvider.getPathMatcher().extractPathWithinPattern(
	            String.valueOf(request.getAttribute(HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE)),
	            String.valueOf(request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE)));
	}
	
	private Resource getBodyAsResource(HttpServletRequest request)
	{
		try
		{
			return new InputStreamResource(request.getInputStream());
		}
		catch(Exception e)
		{
			throw new RuntimeException(e.getMessage());
		}
	}
	
	@Autowired
	private FrontendService frontendService;
}
