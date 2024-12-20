
    using Microsoft.AnalysisServices.AdomdClient;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Collections.Generic;

    namespace CubeService.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        public class CubeDataController : ControllerBase
        {
            private readonly string connectionString = "Provider=MSOLAP;Data Source=DESKTOP-B0IN09C\\MSSQLSERVERDB;Initial Catalog=Comms_v2 ";

            [HttpGet("query1")]
            public ActionResult GetQuery1Data(int age)
            {
                try
                {
                    using (AdomdConnection conn = new AdomdConnection(connectionString))
                    {
                        conn.Open();
                        AdomdCommand cmd = conn.CreateCommand();
                    if (age == 0)
                    {

                        string mdxQuery = @"SELECT {
                             [Measures].[Nb Sent]
                             ,[Measures].[Nb Dispatched]
                             ,[Measures].[Nb Deliv]
                             ,[Measures].[Delivery_Rate]
                            } ON COLUMNS,
                            nonempty
                            (
                            {
                            [Campaigns].[Prj Mkg ID].[Prj Mkg ID]
                            },
                            {
                            [Genders].[Gender ID].[Gender ID]
                            }
                            )ON ROWS
                            FROM [DS]";
                        cmd.CommandText = mdxQuery;

                        // Log the MDX query for debugging purposes
                        Console.WriteLine($"Executing MDX query: {mdxQuery}");
                    }
                    else
                    {

                        string mdxQuery = @"SELECT {

                                                            [Measures].[Nb Sent]
                                                            ,[Measures].[Nb Dispatched]
                                                            ,[Measures].[Nb Deliv]
                                                            ,[Measures].[Delivery_Rate]
                                                            } ON COLUMNS,
                                                            nonempty
                                                            (
                                                            {
                                                            [Campaigns].[Prj Mkg ID].[Prj Mkg ID]
                                                            },
                                                            {
                                                            [Genders].[Gender ID].[Gender ID]
                                                            }
                                                            )ON ROWS
                                                            FROM [DS]
                                                            where ([Age Bands].[Age ID].&["" + age + ""])";
                        cmd.CommandText = mdxQuery;

                        // Log the MDX query for debugging purposes
                        Console.WriteLine($"Executing MDX query: {mdxQuery}");

                    }
                        AdomdDataReader reader = cmd.ExecuteReader();

                        // Process the data and return JSON
                        var jsonData = ProcessData(reader);

                        // Return JSON data
                        return Ok(new { Data = jsonData, Message = "Query 1 data retrieved successfully" });
                    }
                }
                catch (AdomdException ex)
                {
                    // Log the exception for debugging purposes
                    Console.WriteLine($"Error retrieving data: {ex.Message}");

                    // Handle exceptions and return an appropriate response
                    return BadRequest($"Error retrieving data: {ex.Message}");
                }
            }
            [HttpGet("query2")]
            public ActionResult GetQuery2Data(int gender)
            {
                try
                {
                    using (AdomdConnection conn = new AdomdConnection(connectionString))
                    {
                        conn.Open();
                        AdomdCommand cmd = conn.CreateCommand();
                    if (gender == 0) { 
                        string mdxQuery = @"SELECT  
                            {    
                            [Measures].[Nb Sent],
                            [Measures].[Nb Dispatched],
                            [Measures].[Nb Deliv]
                            } ON COLUMNS,  
                            nonempty ((
                             [Campaigns].[Prj Mkg ID].[Prj Mkg ID]
                            )) ON ROWS  
                             FROM [DS]";
                        cmd.CommandText = mdxQuery;

                        // Log the MDX query for debugging purposes
                        Console.WriteLine($"Executing MDX query: {mdxQuery}");
                    }
                    else
                    {
                        string mdxQuery = @"SELECT  
                                    {    
                                    [Measures].[Nb Sent],
                                    [Measures].[Nb Dispatched],
                                    [Measures].[Nb Deliv]
	                                } ON COLUMNS,  
                                   nonempty ((
 
	                                  [Campaigns].[Prj Mkg ID].[Prj Mkg ID]
	                                 )) ON ROWS  
                                FROM [DS]  

                                WHERE ([Genders].[Gender ID].&[""+ gender+""] )   ";
                        cmd.CommandText = mdxQuery;

                        // Log the MDX query for debugging purposes
                        Console.WriteLine($"Executing MDX query: {mdxQuery}");

                    }
                    AdomdDataReader reader = cmd.ExecuteReader();

                        // Process the data and return JSON
                        var jsonData = ProcessData(reader);

                        // Return JSON data
                        return Ok(new { Data = jsonData, Message = "Query 2 data retrieved successfully" });
                    }
                }
                catch (AdomdException ex)
                {
                    // Log the exception for debugging purposes
                    Console.WriteLine($"Error retrieving data: {ex.Message}");

                    // Handle exceptions and return an appropriate response
                    return BadRequest($"Error retrieving data: {ex.Message}");
                }
            }

        [HttpGet("query3")]
        public ActionResult GetQuery3Data(int gender)
        {
            try
            {
                using (AdomdConnection conn = new AdomdConnection(connectionString))
                {
                    conn.Open();
                    AdomdCommand cmd = conn.CreateCommand();
                  
                    
                        string mdxQuery = @"  SELECT {

                               [Measures].[Nb Sent]
                               ,[Measures].[Nb Dispatched]
                               ,[Measures].[Nb Deliv]
                               ,[Measures].[Delivery_Rate]
                               } ON COLUMNS,
                               nonempty
                               (
                               {[Campaigns].[Campaign Name].[Campaign Name]
      
                               },
                               {
                              [Genders].[Gender ID].[Gender ID]
                               }
                               )ON ROWS
                               from[DS]";
                        cmd.CommandText = mdxQuery;

                        // Log the MDX query for debugging purposes
                   
                    AdomdDataReader reader = cmd.ExecuteReader();

                    // Process the data and return JSON
                    var jsonData = ProcessData(reader);

                    // Return JSON data
                    return Ok(new { Data = jsonData, Message = "Query 2 data retrieved successfully" });
                }
            }
            catch (AdomdException ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine($"Error retrieving data: {ex.Message}");

                // Handle exceptions and return an appropriate response
                return BadRequest($"Error retrieving data: {ex.Message}");
            }
        }

        [HttpGet("query4")]
        public ActionResult GetQuery4Data(int gender)
        {
            try
            {
                using (AdomdConnection conn = new AdomdConnection(connectionString))
                {
                    conn.Open();
                    AdomdCommand cmd = conn.CreateCommand();


                    string mdxQuery = @"SELECT
                            (
                            {
                            [Measures].[Nb Deliv]
                            ,[Measures].[Nb Clicks]
                            ,[Measures].[Nb Views]
                            }
                            ) ON COLUMNS,
                            NONEMPTY(
                            {
                            [Calendar].[Week].[Week]
                            }
                            ) ON ROWS
                            FROM [DS]";
                    cmd.CommandText = mdxQuery;

                    // Log the MDX query for debugging purposes

                    AdomdDataReader reader = cmd.ExecuteReader();

                    // Process the data and return JSON
                    var jsonData = ProcessData(reader);

                    // Return JSON data
                    return Ok(new { Data = jsonData, Message = "Query 4 data retrieved successfully" });
                }
            }
            catch (AdomdException ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine($"Error retrieving data: {ex.Message}");

                // Handle exceptions and return an appropriate response
                return BadRequest($"Error retrieving data: {ex.Message}");
            }
        }





        [HttpGet("query5")]
        public ActionResult GetQuery5Data(int gender)
        {
            try
            {
                using (AdomdConnection conn = new AdomdConnection(connectionString))
                {
                    conn.Open();
                    AdomdCommand cmd = conn.CreateCommand();


                    string mdxQuery = @"SELECT {

                          [Measures].[Nb Sent]
                          ,[Measures].[Nb Dispatched]
                          ,[Measures].[Nb Deliv]
                          ,[Measures].[Delivery_Rate]
                          } ON COLUMNS,
                          nonempty
                          (
    
                         [Calendar].[Month].[Month]


                          )ON ROWS
                          FROM [DS]";
                    cmd.CommandText = mdxQuery;

                    // Log the MDX query for debugging purposes

                    AdomdDataReader reader = cmd.ExecuteReader();

                    // Process the data and return JSON
                    var jsonData = ProcessData(reader);

                    // Return JSON data
                    return Ok(new { Data = jsonData, Message = "Query 2 data retrieved successfully" });
                }
            }
            catch (AdomdException ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine($"Error retrieving data: {ex.Message}");

                // Handle exceptions and return an appropriate response
                return BadRequest($"Error retrieving data: {ex.Message}");
            }
        }
        private List<Dictionary<string, object>> ProcessData(AdomdDataReader reader)
            {
                var result = new List<Dictionary<string, object>>();

                while (reader.Read())
                {
                    var row = new Dictionary<string, object>();

                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        // Assuming each field is a measure, you may need to adjust accordingly
                        row[reader.GetName(i)] = reader.GetValue(i);
                    }

                    result.Add(row);
                }

                return result;
            }
        }
    }


