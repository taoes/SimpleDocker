package com.taoes.simpledocker.config.securoty;

import com.taoes.simpledocker.model.ResponseModel;
import com.taoes.simpledocker.utils.JsonUtils;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

  @Override
  public void commence(HttpServletRequest httpServletRequest,
      HttpServletResponse httpServletResponse, AuthenticationException e)
      throws IOException, ServletException {
    ResponseModel<String> model = ResponseModel.fail(e.getMessage());
    model.setCode(401);

    httpServletResponse.setCharacterEncoding("UTF-8");
    httpServletResponse.setContentType("application/json");
    httpServletResponse.getWriter().println(JsonUtils.toJsonString(model));
    httpServletResponse.getWriter().flush();
  }
}