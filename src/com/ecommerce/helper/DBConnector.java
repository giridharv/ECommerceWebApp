package com.ecommerce.helper;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnector {
	Connection connection;
	  
	public Connection getConnection()
 { 
	try 
	{
		Class.forName("com.mysql.jdbc.Driver");
		connection =DriverManager.getConnection("jdbc:mysql://localhost:3306/soundcomponents","root","loveisintheair59");
	} 
	catch (ClassNotFoundException e) 
	{
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	catch (SQLException e) 
	{
		// TODO Auto-generated catch block
		e.printStackTrace();
	} 
	return connection;
 }
	
	public void closeConnection()
	{
		try {
			connection.commit();
			connection.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
