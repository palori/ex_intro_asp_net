using Microsoft.EntityFrameworkCore;

namespace empleats.Models
{
    public class EmpleatsContext : DbContext
    {
        public EmpleatsContext(DbContextOptions<EmpleatsContext> options)
            : base(options)
        {
        }

        public DbSet<Empleat> Empleats { get; set; }
    }
}