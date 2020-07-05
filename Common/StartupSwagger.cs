using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace NetCoreAngularNgrx.Common
{
    public static class StartupSwagger
    {
        public static IServiceCollection AddSwaggerServices(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "My API", Version = "v1"}); 
            });
            
            return services;
        }

        public static IApplicationBuilder UseSwaggerMiddleware(IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                c.RoutePrefix = "swagger";
            });
            
            return app;
        }
    }
}