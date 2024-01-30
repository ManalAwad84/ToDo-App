using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using ToDo_App.Models;

namespace ToDo_App.Data
{
    public class AppDbContext : DbContext
    {
        public IConfiguration _config { get; set; }

        public AppDbContext(IConfiguration config)
        { 
            _config = config;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_config.GetConnectionString("DatabaseConnection"));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ToDoItem>()
                .HasOne(e=> e.Status)
                .WithMany(e=> e.ToDoItems)
                .HasForeignKey(e=> e.StatusId);
        }
        public DbSet<ToDoItem> ToDoItems { get; set; }

        public DbSet<ItemStatus> ItemStatus { get; set; }
    }
}