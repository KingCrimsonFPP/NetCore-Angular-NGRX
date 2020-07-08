using Microsoft.EntityFrameworkCore;
using NetCoreAngularNgrx.Common.Models;
using System;
using System.Collections.Generic;

namespace NetCoreAngularNgrx.Repositories.Common
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

            modelBuilder.Entity<Board>(entity =>
            {
                entity.Property(s => s.Date)
                .HasColumnName("Date")
                .HasDefaultValue(DateTime.Now)
                .ValueGeneratedOnAddOrUpdate()
                .IsRequired();

                //entity.HasMany(d => d.Notes)
                //    .WithOne(p => p.Board)
                //    .HasForeignKey(d => d.BoardId)
                //    .HasConstraintName("FK_Notes_Board");

                entity.HasData(SeedBoards());
            });

            modelBuilder.Entity<Note>(entity =>
                {
                    entity.Property(s => s.Date)
                        .HasColumnName("Date")
                        .HasDefaultValue(DateTime.Now)
                        .ValueGeneratedOnAddOrUpdate()
                        .IsRequired();

                    //entity.HasOne(d => d.Board)
                    //    .WithMany(p => p.Notes)
                    //    .HasForeignKey(d => d.BoardId)
                    //    .HasConstraintName("FK_Notes_Board");

                    entity.HasData(SeedNotes());
                });
        }
        private static Board[] SeedBoards()
        {
            return new[]
            {
                new Board {Id = 1, Title = "Board1"},
                new Board {Id = 2, Title = "Board2"},
                new Board {Id = 3, Title = "Board3"},
            };
        }
        private static Note[] SeedNotes()
        {
            return new[] { new Note { Id = 1, BoardId = 1, Title = "Random Title", Description = "Random Description" } };
        }
        private static WeatherForecast[] SeedForecasts()
        {
            return new[]
            {
                new WeatherForecast {Id = 1, TemperatureC = 0, Summary = "Freezing", Date = DateTime.Now},
                new WeatherForecast {Id = 2, TemperatureC = 5, Summary = "Bracing", Date = DateTime.Now},
                new WeatherForecast {Id = 3, TemperatureC = 10, Summary = "Chilly", Date = DateTime.Now},
                new WeatherForecast {Id = 4, TemperatureC = 15, Summary = "Cool", Date = DateTime.Now},
                new WeatherForecast {Id = 5, TemperatureC = 20, Summary = "Mild", Date = DateTime.Now},
                new WeatherForecast {Id = 6, TemperatureC = 25, Summary = "Warm", Date = DateTime.Now},
                new WeatherForecast {Id = 7, TemperatureC = 27, Summary = "Balmy", Date = DateTime.Now},
                new WeatherForecast {Id = 8, TemperatureC = 30, Summary = "Hot", Date = DateTime.Now},
                new WeatherForecast {Id = 9, TemperatureC = 35, Summary = "Sweltering", Date = DateTime.Now},
                new WeatherForecast {Id = 10, TemperatureC = 40, Summary = "Scorching", Date = DateTime.Now},
            };
        }
    }
}