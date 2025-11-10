using System.Collections.Generic;

namespace APIServiceFactory
{
    public interface IImporterScanner
    {
        IEnumerable<string> GetImporterDlls();
    }
}

