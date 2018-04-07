package com.ecommerce.endpoints;

import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ecommerce.implementations.CreateOrderRequestImplementation;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

/**
 * Servlet implementation class CreateOrderRequest
 */
@WebServlet("/createOrderRequest")
public class CreateOrderRequest extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CreateOrderRequest() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("In from servlet");
		ObjectMapper objectMapper = new ObjectMapper();
		Reader reader = new StringReader(request.getParameter("cartObj"));
		ObjectNode node = objectMapper.readValue(reader, ObjectNode.class);
		response.getWriter().print(new CreateOrderRequestImplementation().createOrder(node));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}



// Referred to code at https://stackoverflow.com/questions/7653813/jackson-json-get-node-name-from-json-tree/18342245#18342245 for looping through keys in Jackson
