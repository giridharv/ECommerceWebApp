package com.ecommerce.implementations;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ecommerce.helper.DBConnector;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class FetchProductDetailsImplementation {
	
	public  ArrayNode getProductInfo(String sku)
	  {
		  DBConnector connector=new DBConnector();
		  Connection con=connector.getConnection();
		  String query = "SELECT sku,vendor.name as vendorname,vendorModel,description,features,retail,quantity,image FROM product,vendor,category where venID=vendor.id and catID = category.ID and sku=?";
		  PreparedStatement pstmt;
		  ObjectMapper objectMapper = new ObjectMapper();
		  ArrayNode jsonArray = objectMapper.createArrayNode();
		try {
			pstmt = con.prepareStatement(query);
			ResultSet rs;
			con = connector.getConnection();
		    pstmt.setString(1, sku);
		    rs = pstmt.executeQuery();
		    while(rs.next())
			{
		    	ObjectNode product = objectMapper.createObjectNode();
		    	product.put("sku", rs.getString("sku"));
		    	product.put("vendorModel", rs.getString("vendorModel"));
		    	product.put("vendorName", rs.getString("vendorName"));
		    	product.put("description", rs.getString("description"));
		    	product.put("features", rs.getString("features"));
		    	product.put("retail", rs.getString("retail"));
		    	product.put("quantity", rs.getString("quantity"));
		    	product.put("image", rs.getString("image"));
			    jsonArray.add(product);
			}
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		  //connector.closeConnection();
		  return jsonArray;
	  }
}
