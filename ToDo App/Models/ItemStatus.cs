namespace ToDo_App.Models
{
    public class ItemStatus
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public virtual ICollection<ToDoItem> ToDoItems { get; set; }
    }
}
