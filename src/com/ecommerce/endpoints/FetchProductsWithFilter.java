package com.ecommerce.endpoints;

import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ecommerce.implementations.FetchProductDetailsImplementation;
import com.ecommerce.implementations.FetchProductWithFilterImplementation;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

/**
 * Servlet implementation class FetchProductsWithFilter
 */
@WebServlet("/fetchProductsWithFilter")
public class FetchProductsWithFilter extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FetchProductsWithFilter() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		ObjectMapper objectMapper = new ObjectMapper();
		Reader reader = new StringReader(request.getParameter("filterObj"));
		ObjectNode node = objectMapper.readValue(reader, ObjectNode.class);
		JsonNode brandArray = node.get("brand");
		JsonNode categoryArray = node.get("category");
		JsonNode availabilityArray = node.get("availability");
		JsonNode priceArray = node.get("price");
		response.setContentType("application/json");
		response.getWriter().println(new FetchProductWithFilterImplementation().getAllProducts(brandArray,categoryArray,availabilityArray,priceArray));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
