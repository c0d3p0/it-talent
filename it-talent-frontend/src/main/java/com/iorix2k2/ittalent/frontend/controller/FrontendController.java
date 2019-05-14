package com.iorix2k2.ittalent.frontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class FrontendController
{
	@RequestMapping("/")
	public String redirectToIndex()
	{
		return "index.html";
	}
}
