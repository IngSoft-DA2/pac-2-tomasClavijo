using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Loader;
using Microsoft.AspNetCore.Hosting;
using IImporter;

namespace APIServiceFactory
{
    public class ImporterScanner : IImporterScanner
    {
        private readonly IWebHostEnvironment _env;

        public ImporterScanner(IWebHostEnvironment env)
        {
            _env = env;
        }

        public IEnumerable<string> GetImporterDlls()
        {
            var result = new List<string>();
            var reflectionDir = Path.Combine(_env.ContentRootPath, "reflection");
            if (!Directory.Exists(reflectionDir))
            {
                return result;
            }

            var interfaceType = typeof(ImporterInterface);

            foreach (var dllPath in Directory.EnumerateFiles(reflectionDir, "*.dll", SearchOption.TopDirectoryOnly))
            {
                if (!IsManagedAssembly(dllPath))
                {
                    continue;
                }

                if (AssemblyContainsImporter(dllPath, interfaceType))
                {
                    result.Add(Path.GetFileName(dllPath));
                }
            }

            return result;
        }

        private static bool IsManagedAssembly(string path)
        {
            try
            {
                AssemblyName.GetAssemblyName(path);
                return true;
            }
            catch
            {
                return false;
            }
        }

        private static bool AssemblyContainsImporter(string path, Type interfaceType)
        {
            try
            {
                var asm = AssemblyLoadContext.Default.LoadFromAssemblyPath(Path.GetFullPath(path));
                return asm.ExportedTypes.Any(t => t.IsClass && !t.IsAbstract && interfaceType.IsAssignableFrom(t));
            }
            catch
            {
                return false;
            }
        }
    }
}

