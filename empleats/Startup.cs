// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
// using Microsoft.AspNetCore.HttpsPolicy;
// using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
// using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;    // added
using empleats.Models;                  // added


// Source CORS: https://docs.microsoft.com/es-es/aspnet/core/security/cors?view=aspnetcore-3.1

namespace empleats
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins"; // added

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>                                 // added
            {
                options.AddPolicy(
                    name: MyAllowSpecificOrigins,
                    builder =>
                    {
                        /*builder.WithOrigins("http://localhost:5000/api/empleat",
                                            "http://localhost:5000/api/empleats",
                                            "https://localhost:5001/api/empleat",
                                            "https://localhost:5001/api/empleats")
                                .AllowAnyHeader();*/
                        /*builder.WithOrigins("http://localhost:5000",
                                            "https://localhost:5001")
                                .AllowAnyHeader();*/
                        builder.WithOrigins("*")
                               .AllowAnyHeader();
                    });
            });

            services.AddDbContext<EmpleatsContext>(opt =>               // added
               opt.UseInMemoryDatabase("EmpleatsList"));
            
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles();               // added

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);                      // added

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                /*endpoints.MapGet("/echo",
                    context => context.Response.WriteAsync("echo"))
                    .RequireCors(MyAllowSpecificOrigins);           // added
                */
                endpoints.MapControllers();
                         //.RequireCors(MyAllowSpecificOrigins);      // added (only this line)
                /*
                endpoints.MapGet("/echo2",
                context => context.Response.WriteAsync("echo2"));   // added

                endpoints.MapRazorPages();                          // added
                */
            });
        }
    }
}
