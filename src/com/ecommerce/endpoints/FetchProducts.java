package com.ecommerce.endpoints;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ecommerce.implementations.FetchProductImplementation;

/**
 * Servlet implementation class FetchProducts
 */
@WebServlet("/fetchProducts")
public class FetchProducts extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FetchProducts() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		if(request.getParameterValues("skuList[]")!=null)
		{
			System.out.println("Not null");
			String[] skuList = request.getParameterValues("skuList[]");
			response.setContentType("application/json");
			response.getWriter().println(new FetchProductImplementation().getAllProducts(skuList));		
		}
		else
		{
			System.out.println("From null");
			response.setContentType("application/json");
			response.getWriter().println(new FetchProductImplementation().getAllProducts());	
		}
	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
