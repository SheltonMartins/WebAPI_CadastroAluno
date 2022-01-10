using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace WebApplication3.Models
{
    public class Aluno
    {
        public int id { get; set; }
        public string nome { get; set; }
        public string sobrenome { get; set; }

        public List<Aluno> listarAlunos()
        {

            var caminhoarquivo = HostingEnvironment.MapPath(@"~/App_Data\Base.json");
            var json = File.ReadAllText(caminhoarquivo);
            var listaAlunos = JsonConvert.DeserializeObject<List<Aluno>>(json);

            return listaAlunos;      
        }

        public bool RescreverArquivo(List<Aluno> listaAlunos)
        {
            var caminhoarquivo = HostingEnvironment.MapPath(@"~/App_Data\Base.json");
            var json = JsonConvert.SerializeObject(listaAlunos, Formatting.Indented);
            File.WriteAllText(caminhoarquivo, json);

            return true;

        }

        public Aluno Inserir(Aluno aluno)
        {
            var listaAluno = this.listarAlunos();
            var maxId = listaAluno.Max(Aluno => Aluno.id);
            aluno.id = maxId + 1;
            listaAluno.Add(aluno);

            RescreverArquivo(listaAluno);
            return aluno;
        }

        public Aluno Atualizar(int id, Aluno Aluno)
        {
            var listaAlunos = this.listarAlunos();

            var itemIndex = listaAlunos.FindIndex(p => p.id == id);
            if(itemIndex >= 0)
            {
                Aluno.id = id;
                listaAlunos[itemIndex] = Aluno;
            }
            else
            {
                return null;
            }

            RescreverArquivo(listaAlunos);
            return Aluno;


        }

        public bool Deletar(int id)
        {
            var listaAlunos = this.listarAlunos();

            var itemIndex = listaAlunos.FindIndex(p => p.id == id);
            if(itemIndex >= 0)
            {
                listaAlunos.RemoveAt(itemIndex);
            }
            else
            {
                return false;
            }

            RescreverArquivo(listaAlunos);
            return true;
        }











    }
}