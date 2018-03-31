package com.ecommerce.implementations;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ecommerce.helper.DBConnector;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class FetchProductImplementation 
{
  public  ArrayNode getAllProducts()
  {
	  DBConnector connector=new DBConnector();
	  Connection con=connector.getConnection();
	  String query = "SELECT sku,vendor.name as vendorname,vendorModel,retail,quantity,image FROM product,vendor,category where venID=vendor.id and catID = category.ID";
	  PreparedStatement pstmt;
	  ObjectMapper objectMapper = new ObjectMapper();
	  ArrayNode jsonArray = objectMapper.createArrayNode();
	try {
		pstmt = con.prepareStatement(query);
		ResultSet rs;
		con = connector.getConnection();
	    rs = pstmt.executeQuery(query);
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
	  return jsonArray;
  }
}
