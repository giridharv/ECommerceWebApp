package com.ecommerce.implementations;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ecommerce.helper.DBConnector;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class SearchForProductImplementation {
	public  ArrayNode getAllProducts(String searchString)
	  {
		  DBConnector connector=new DBConnector();
		  Connection con=connector.getConnection();
		  StringBuilder query =new StringBuilder();
		  query.append("SELECT sku,vendor.name as vendorname,vendorModel,retail,quantity,image FROM product INNER JOIN vendor ON venID=vendor.id WHERE description LIKE")
		  .append("'%").append(searchString).append("%'").append("OR features LIKE").append("'%").append(searchString).append("%'");
		  PreparedStatement pstmt=null;
		  ResultSet rs=null;
		  ObjectMapper objectMapper = new ObjectMapper();
		  ArrayNode jsonArray = objectMapper.createArrayNode();
		try {
			pstmt = con.prepareStatement(query.toString());
			con = connector.getConnection();
		    rs = pstmt.executeQuery(query.toString());
		    while(rs.next())
			{
		    	ObjectNode product = objectMapper.createObjectNode();
		    	product.put("sku", rs.getString("sku"));
		    	product.put("vendorName", rs.getString("vendorname"));
		    	product.put("vendorModel", rs.getString("vendorModel"));
		    	product.put("retail", rs.getString("retail"));
		    	product.put("quantity", rs.getString("quantity"));
		    	product.put("image", rs.getString("image"));
			    jsonArray.add(product);
			}
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		finally {
	        try {
	            if(rs != null)
	                rs.close();
	            if(pstmt != null)
	                pstmt.close();
	            if(con != null)                   
	        	    con.close();
	            }
	        catch(SQLException e) {
	            e.printStackTrace();
	            }
	  }
		  return jsonArray;
	  }
}
