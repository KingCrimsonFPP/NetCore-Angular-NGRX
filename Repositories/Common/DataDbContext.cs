using System;
using System.Collections.Generic;
using AssessmentPreparation.Common.Models;
using Microsoft.EntityFrameworkCore;

namespace AssessmentPreparation.Repositories.Common
{
    public class DataDbContext : DbContext
    {
        public DataDbContext(DbContextOptions<DataDbContext> options) : base(options) { }
        public DbSet<WeatherForecast> WeatherForecasts { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Board> Boards { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Seeding(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }

        private static void Seeding(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WeatherForecast>().HasData(SeedForecasts());

            modelBuilder.Entity<Note>()
                    .Property(s => s.Date)
                    .HasColumnName("Date")
                    .HasDefaultValue(DateTime.Now)
                    .ValueGeneratedOnAddOrUpdate()
                    .IsRequired();

            //modelBuilder.Entity<Note>()
            //    .HasOne<Board>(s => s.Board)
            //    .WithMany(g => g.Notes)
            //    .HasForeignKey(s => s.BoardId);

            modelBuilder.Entity<Note>()
                .HasData(SeedNotes());


            modelBuilder.Entity<Board>()
                .Property(s => s.Date)
                .HasColumnName("Date")
                .HasDefaultValue(DateTime.Now)
                .ValueGeneratedOnAddOrUpdate()
                .IsRequired();

            modelBuilder.Entity<Board>()
                .HasData(SeedBoards());
        }

        private static Board[] SeedBoards()
        {
            return new[]
            {
                new Board { Id = 1, Title = "Board #1"},
                new Board {Id = 2, Title = "Board #2"},
                new Board {Id = 3, Title = "Board #3"}
            };
        }

        private static Note[] SeedNotes()
        {
            return new[] { new Note { Id = 1, BoardId = 1, Title = "Random Title", Description = "Random Description" } };
        }

        private static WeatherForecast[] SeedForecasts()
        {
            return new[]
            {  new WeatherForecast {Id = 1, TemperatureC = 0, Summary = "Freezing", Date = DateTime.Now}
                , new WeatherForecast {Id = 2, TemperatureC = 5, Summary = "Bracing", Date = DateTime.Now}
                , new WeatherForecast {Id = 3, TemperatureC = 10, Summary = "Chilly", Date = DateTime.Now}
                , new WeatherForecast {Id = 4, TemperatureC = 15, Summary = "Cool", Date = DateTime.Now}
                , new WeatherForecast {Id = 5, TemperatureC = 20, Summary = "Mild", Date = DateTime.Now}
                , new WeatherForecast {Id = 6, TemperatureC = 25, Summary = "Warm", Date = DateTime.Now}
                , new WeatherForecast {Id = 7, TemperatureC = 27, Summary = "Balmy", Date = DateTime.Now}
                , new WeatherForecast {Id = 8, TemperatureC = 30, Summary = "Hot", Date = DateTime.Now}
                , new WeatherForecast {Id = 9, TemperatureC = 35, Summary = "Sweltering", Date = DateTime.Now}
                , new WeatherForecast {Id = 10, TemperatureC = 40, Summary = "Scorching", Date = DateTime.Now}
            };
        }
    }
}
