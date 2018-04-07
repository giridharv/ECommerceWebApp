package com.ecommerce.implementations;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Iterator;

import com.ecommerce.helper.DBConnector;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class CreateOrderRequestImplementation {

	public String createOrder(ObjectNode node)
	{
	Iterator<String> iter = node.fieldNames();
	while(iter.hasNext())
	{
		String sku = iter.next();
		sku = sku.substring(0,7);
		int qty = node.get(sku).get("qty").asInt();
		runQuery(sku, qty);
	}
		return "OK";
	}
	public void runQuery(String sku,int qty)
	{
		 DBConnector connector=new DBConnector();
		  Connection con=connector.getConnection();
		  String query = "UPDATE product SET quantity=(quantity-?) WHERE sku=?";
		  PreparedStatement pstmt=null;
		  ResultSet rs=null;
		  try {
			pstmt = con.prepareStatement(query);
			con = connector.getConnection();
		    pstmt.setInt(1, qty);
		    pstmt.setString(2, sku);
		    pstmt.executeUpdate();
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
	}
}
