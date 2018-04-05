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

public class FetchProductWithFilterImplementation {
	 
	public String buildQuery(JsonNode brand,JsonNode category,JsonNode availability,JsonNode price)
	{
		StringBuilder queryString = new StringBuilder();
		queryString.append("SELECT sku,vendor.name as vendorname,vendorModel,retail,quantity,image FROM product,category,vendor WHERE venID=vendor.id and catID = category.ID");
		if(brand.size()==0 && category.size()==0 && availability.size()==0 && price.size()==0)
		{
			return queryString.toString();
		}
	    if(brand.size()>0)
	    {
	    	if(brand.size()==1)
	    		{
	    		 queryString.append(" AND vendor.name IN(").append(brand.get(0)).append(")").toString();
	    		}
	    	else
	    	{
	    		int i=0;
	    		queryString.append(" AND vendor.name IN(");
	    		for(;i<brand.size()-1;i++)
	    		{
	    			queryString.append(brand.get(i)).append(",");
	    		}
	    		queryString.append(brand.get(i)).append(")");
	    	}
	    		
	    }
	    if(category.size()>0)
	    {
	    	if(category.size()==1)
    		{
    		 queryString.append(" AND category.name IN(").append(category.get(0)).append(")");
    		}
	    	else
	    	{
	    		int i=0;
	    		queryString.append(" AND category.name IN(");
	    		for(;i<category.size()-1;i++)
	    		{
	    			queryString.append(category.get(i)).append(",");
	    		}
	    		queryString.append(category.get(i)).append(")");	
	    	}
    		
	    }

	    if(availability.size()>0)
	    {
	      if(availability.size()==2)
	      {
	    	  //
	      }
	      else if(availability.get(0).asText().equals("In Stock"))
	    	  {
	    		  queryString.append(" AND quantity > ").append('0');
	    	  }
	    	  else
	    	  {
	    		   queryString.append(" AND quantity <= ").append('0');
	    	  }
	      
	    }
	    if(price.size()>0)
	    {
	    	if(price.size()==2)
	    	{
	    		return queryString.toString().trim(); 
	    	}
	    	else if(price.get(0).asText().equals("Price Low to High"))
	    	  {
	    		  return queryString.append(" ORDER BY retail ASC").toString();
	    	  }
	    	  else
	    	  {
	    		  return queryString.append(" ORDER BY retail DESC").toString();
	    	  }
	    }
		return queryString.toString().trim();
	}
	public  ArrayNode getAllProducts(JsonNode brand,JsonNode category,JsonNode availability,JsonNode price)
	  {
		  DBConnector connector=new DBConnector();
		  Connection con=connector.getConnection();
		  String query = buildQuery(brand,category,availability,price); 
		  System.out.println("From Error" + query);
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
