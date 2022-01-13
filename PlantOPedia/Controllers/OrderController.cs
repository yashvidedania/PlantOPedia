using Microsoft.AspNetCore.Mvc;
using PlantOPedia.Data;
using PlantOPedia.Models;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PlantOPedia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        readonly PlantdbContext _context;
        public OrderController(PlantdbContext context)
        {
            _context = context;
        }
        // GET: api/<OrderController>
        [HttpGet]
        public IActionResult GetAll()
        {

            return Ok(_context.Orders.ToList());

        }

        // GET api/<OrderController>/5
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {

            return Ok(_context.Orders.FirstOrDefault(order => order.OrderId == id && order.IsDeleted == false));

        }

        // POST api/<OrderController>
        [HttpPost]
        public IActionResult Post([FromBody] Order order)
        {
            _context.Orders.Add(order);
            _context.SaveChanges();
            return Ok("Changes are Saved Seccessful");
        }

        // PUT api/<OrderController>/5            
        [HttpPut("{id}")]
        public void Put([FromBody] int id)
        {
        }

        // DELETE api/<OrderController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var exists = _context.Orders.Find(id);
            {
                if (exists != null)
                {
                    exists.IsDeleted = true;
                    _context.Orders.Update(exists);
                    _context.SaveChanges();
                }
                else
                {
                    return NotFound("Order Not Found");
                }
                return Ok("Success");
            }
        }
    }
}
