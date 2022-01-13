using Microsoft.AspNetCore.Mvc;
using PlantOPedia.Models;

using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Text;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PlantOPedia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        // GET: api/<LoginController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<LoginController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        public List<Login> Userloginvalues()
        {
            List<Login> obj = new List<Login>();
            obj.Add(new Login { Username = "user1", Pwd = "password1" });
            obj.Add(new Login { Username = "user2", Pwd = "password2" });
            obj.Add(new Login { Username = "user3", Pwd = "password3" });
            obj.Add(new Login { Username = "user4", Pwd = "password4" });
            obj.Add(new Login { Username = "user5", Pwd = "password5" });
            return obj;
        }
        // POST api/<LoginController>
        [HttpPost]
        public ActionResult Post([FromBody] Login  login)
        {
            var pass = login.Pwd;
            const string Salt = "CGYzqeN4plZekNC88Umm1Q==";
            byte[] bytesSalt = Encoding.ASCII.GetBytes(Salt);

            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: pass,
            salt: bytesSalt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 32));
            //Console.WriteLine($"Hashed: {hashed}");

            var FindUser =  _ .FirstOrDefault(f => f.Username == login.Username && f.Pwd == hashedPassword);
            if (FindUser != null)
            {
                return Ok("Success");
            }
            else
            {
                return NotFound("Invalid Username or Password");
            }
        }

        // PUT api/<LoginController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<LoginController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
