using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDo_App.Data;
using ToDo_App.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ToDo_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class TodoAPIController : ControllerBase
    {
        private AppDbContext _context;
        private IConfiguration _config { get; set; }

        public TodoAPIController(IConfiguration config)
        {
            _config = config;
            _context = new AppDbContext(_config);
        }

        // GET: api/<TodoAPIController>
        [HttpGet]
        public async Task<IEnumerable<ToDoItem>> Get()
        {

            List<ToDoItem> todoItems = new List<ToDoItem>();
            using (_context)
            {
                todoItems = await _context.ToDoItems.Include(x => x.Status).ToListAsync();
            }
            return todoItems;
        }


        // POST api/<TodoAPIController>
        [HttpPost]
        public async Task<ToDoItem> Post(ToDoItem value)
        {
            using (_context)
            {
                var newItem = new ToDoItem
                {
                    Description = value.Description,
                    StatusId = value.StatusId,
                    DueDate = value.DueDate
                };
                _context.ToDoItems.Add(newItem);
                _context.SaveChanges();
                return newItem;
            }
        }

        // Put api/<TodoAPIController>
        [HttpPut("{id:int}")]
        public async void Put(int id)
        {
            using (_context)
            {
                var todoItem = await _context.ToDoItems.Include(x => x.Status).FirstAsync(i => i.Id == id);
                if (todoItem.StatusId == 2)
                    todoItem.StatusId = 3;
                else if (todoItem.StatusId == 3)
                    todoItem.StatusId = 2;// Mark done status
                _context.SaveChanges();
            }
        }
        // DELETE api/<TodoAPIController>/5
        [HttpDelete("{id}")]
        public async void Delete(int id)
        {
            using (_context)
            {
                var todoItem = await _context.ToDoItems.Include(x => x.Status).FirstAsync(i => i.Id == id);
                todoItem.StatusId = 1;
                _context.SaveChanges();
            }
        }
    }
}