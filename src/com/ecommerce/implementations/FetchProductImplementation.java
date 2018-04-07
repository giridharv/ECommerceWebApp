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
  
  public  ArrayNode getAllProducts(String[] skuList)
  {
	  DBConnector connector=new DBConnector();
	  Connection con=connector.getConnection();
	  String query = buildQuery(skuList); 
	  PreparedStatement pstmt=null;
	  ObjectMapper objectMapper = new ObjectMapper();
	  ArrayNode jsonArray = objectMapper.createArrayNode();
	  ResultSet rs=null;
	  try {
		pstmt = con.prepareStatement(query);	
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
	}finally {
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
  
  
  public String buildQuery(String[] skuList)
  {
	  StringBuilder queryString = new StringBuilder();
	  queryString.append("SELECT sku,vendor.name as vendorname,vendorModel,retail,quantity,image FROM product,vendor,category where venID=vendor.id and catID = category.ID AND sku IN(");
	  int i=0;
	  for(;i<skuList.length-1;i++)
	  {
		  queryString.append('\'').append(skuList[i]).append('\'').append(",");
	  }
	  queryString.append('\'').append(skuList[i]).append('\'').append(")");
	  return queryString.toString().trim();
  }
}
