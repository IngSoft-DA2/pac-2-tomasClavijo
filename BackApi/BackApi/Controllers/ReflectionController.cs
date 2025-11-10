using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using APIServiceFactory;

namespace BackApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReflectionController : ControllerBase
    {
        private readonly IImporterScanner _importerScanner;

        public ReflectionController(IImporterScanner importerScanner)
        {
            _importerScanner = importerScanner;
        }

        [HttpGet("importers")]
        public ActionResult<IEnumerable<string>> GetImporters()
        {
            var dlls = _importerScanner.GetImporterDlls();
            return Ok(dlls);
        }
    }
}
