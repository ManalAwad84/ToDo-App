using System.ComponentModel.DataAnnotations.Schema;

namespace ToDo_App.Models
{
    public class ToDoItem
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public int StatusId { get; set; }

        [ForeignKey("StatusId")]
        public virtual ItemStatus? Status { get; set; }
    }
}
