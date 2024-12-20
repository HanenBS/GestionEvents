using Microsoft.AnalysisServices.AdomdClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using projectBI.Models;
using System;
using System.Collections.Generic;

namespace projectBI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnalyseController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AnalyseController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("analyse1")]
        public IActionResult GetQuery1Data()
        {
            try
            {
                string connectionString = _configuration.GetConnectionString("conn");

                using (AdomdConnection conn = new AdomdConnection(connectionString))
                {
                    conn.Open();
                    AdomdCommand cmd = conn.CreateCommand();

                    string mdxQuery = @"select ( {
                                            [Measures].[Nb Sent], 
                                            [Measures].[Nb Dispatched],
                                            [Measures].[Nb Deliv]
                                        }) on columns,
                                        nonempty((
                                        {
                                            [Campaigns].[Prj Mkg ID].[Prj Mkg ID]
                                        }
                                        )) on rows 
                                        from    [DS]";

                    cmd.CommandText = mdxQuery;

                    // Log the MDX query for debugging purposes
                    Console.WriteLine($"Executing MDX query: {mdxQuery}");

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

        // Implement other action methods similarly...

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
