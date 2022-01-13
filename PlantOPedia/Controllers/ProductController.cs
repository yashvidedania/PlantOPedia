using Microsoft.AspNetCore.Mvc;
using PlantOPedia.Data;
using PlantOPedia.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PlantOPedia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        readonly PlantdbContext _context;   
        public ProductController(PlantdbContext context)
        {
            _context = context;
        }
        // GET: api/<ProductController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ProductController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public IActionResult Put(Guid id, [FromBody] Product product)
        {
            //var Productexists = _context.Products.FirstOrDefault(p => p.ProductId.Equals(id));

            var exists = _context.Products.FirstOrDefault(product => product.ProductId == id && product.IsDeleted == false);
            if(exists != null)
            {
                _context.Products.Update(product);
                _context.SaveChanges();

                return Ok("Success");
            }

            return NotFound("This Product is not avaliable");
            
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            //Soft Delete
            var exists = _context.Products.Find(id);
            if (exists != null)
            {
                exists.IsDeleted = true;
                _context.Products.Update(exists);
                _context.SaveChanges();

                return Ok("Success");
            }
            else
            {
                return NotFound("No Product Found");
            }

        }
    }
}
