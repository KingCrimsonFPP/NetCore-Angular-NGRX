using AssessmentPreparation.Common.Models;
using AssessmentPreparation.Controllers.Common;
using AssessmentPreparation.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace AssessmentPreparation.Controllers
{
    [Route("api/[controller]")]
    public class WeatherForecastController : BaseController<WeatherForecast,int>
    {
        public WeatherForecastController(IDataRepository<WeatherForecast> dataRepository) : base(dataRepository)
        {
        }

   
    }
}
