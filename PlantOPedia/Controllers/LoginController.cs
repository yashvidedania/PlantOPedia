using Microsoft.AspNetCore.Mvc;
using PlantOPedia.Models;

using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Text;
using PlantOPedia.Data;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PlantOPedia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        readonly PlantdbContext _context;
        public LoginController(PlantdbContext context)
        {
            _context = context;
        }
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

        
        // POST api/<LoginController>
        [HttpPost]
        public ActionResult Post([FromBody] LoginCredentials  login)
        {
            var pass = login.Password;
            const string Salt = "CGYzqeN4plZekNC88Umm1Q==";
            byte[] bytesSalt = Encoding.ASCII.GetBytes(Salt);

            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: pass,
            salt: bytesSalt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 32));
            //Console.WriteLine($"Hashed: {hashedPassword}");

            var FindUser = _context.Users.FirstOrDefault(user => user.Email == login.Email && user.Password == hashedPassword);
            if (FindUser != null)
            {
                SuccessResponse successResponse = new SuccessResponse() { Code = "200", Message = "Success"};
                return Ok(successResponse);
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
