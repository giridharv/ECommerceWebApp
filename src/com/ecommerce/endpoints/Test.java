package com.ecommerce.endpoints;

public class Test {
	public String buildQuery(String[] category,String[] availability,String[] price)
	{
		String[] brand ={"Klipsch","Bose","Sony"};
		String baseBrandQuery="WHERE ";
		if(brand.length==1)
		{
			return baseBrandQuery+="vendor.name=" +brand[0];
		}
		int i=0;
		for(;i<brand.length-1;i++)
		{
			baseBrandQuery+="vendor.name="+brand[i];
		}
		baseBrandQuery+=" " + "AND"+ "vendor.name="+brand[i];
		
		return baseBrandQuery;
	}
	public static void main(String[] args) {
		Test t = new Test();
		System.out.println(t.buildQuery(null, null, null));

	}

}
//public class HelloWorld{
//public String buildQuery()
//	{
//		String[] brand ={"Klipsch","Bose"};
//		String[] category ={"BookShelf Speakers","Floor","In Ceiling"};
//		String[] availability ={"in stock","coming soon"};
//		StringBuilder sb= new StringBuilder();
//		sb.append("SELECT * FROM product ");
//		if(brand.length==1)
//		{
//		    return sb.append("WHERE ").append("vendor.name=").append('\'').append(brand[0]).append('\'').toString();
//			//return baseBrandQuery+="vendor.name=" +brand[0];
//		}
// 		int i=0;
// 		for(;i<brand.length-1;i++)
// 		{
// 		    sb.append("WHERE ").append("vendor.name=").append('\'').append(brand[i]).append('\'').append(" ").append("AND").append(" ");
// 		}
// 		  sb.append("vendor.name=").append('\'').append(brand[i]).append('\'');
//		
// 		return sb.toString();
//	}
//     public static void main(String []args){
//      HelloWorld h = new HelloWorld();
//      		System.out.println(h.buildQuery());
//
//     }
//}