package edu.kh.project.member.model.service;

import org.springframework.stereotype.Service;

@Service
public interface AjaxService {

	int emailDupCheck(String memberEmail);

}
