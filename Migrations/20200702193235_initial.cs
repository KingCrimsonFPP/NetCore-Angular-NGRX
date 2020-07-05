using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AssessmentPreparation.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Boards",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(maxLength: 50, nullable: true),
                    Date = table.Column<DateTime>(nullable: false, defaultValue: new DateTime(2020, 7, 2, 14, 32, 34, 727, DateTimeKind.Local).AddTicks(5512))
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Boards", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WeatherForecasts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TemperatureC = table.Column<int>(nullable: false),
                    Summary = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeatherForecasts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Notes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(maxLength: 50, nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false, defaultValue: new DateTime(2020, 7, 2, 14, 32, 34, 724, DateTimeKind.Local).AddTicks(5819)),
                    BoardId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notes_Boards_BoardId",
                        column: x => x.BoardId,
                        principalTable: "Boards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Boards",
                columns: new[] { "Id", "Title" },
                values: new object[] { 1, "Board #1" });

            migrationBuilder.InsertData(
                table: "Boards",
                columns: new[] { "Id", "Title" },
                values: new object[] { 2, "Board #2" });

            migrationBuilder.InsertData(
                table: "Boards",
                columns: new[] { "Id", "Title" },
                values: new object[] { 3, "Board #3" });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 1, new DateTime(2020, 7, 2, 14, 32, 34, 715, DateTimeKind.Local).AddTicks(3137), "Freezing", 0 });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 2, new DateTime(2020, 7, 2, 14, 32, 34, 719, DateTimeKind.Local).AddTicks(731), "Bracing", 5 });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 3, new DateTime(2020, 7, 2, 14, 32, 34, 719, DateTimeKind.Local).AddTicks(916), "Chilly", 10 });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 4, new DateTime(2020, 7, 2, 14, 32, 34, 719, DateTimeKind.Local).AddTicks(922), "Cool", 15 });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 5, new DateTime(2020, 7, 2, 14, 32, 34, 719, DateTimeKind.Local).AddTicks(926), "Mild", 20 });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 6, new DateTime(2020, 7, 2, 14, 32, 34, 719, DateTimeKind.Local).AddTicks(930), "Warm", 25 });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 7, new DateTime(2020, 7, 2, 14, 32, 34, 719, DateTimeKind.Local).AddTicks(933), "Balmy", 27 });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 8, new DateTime(2020, 7, 2, 14, 32, 34, 719, DateTimeKind.Local).AddTicks(936), "Hot", 30 });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 9, new DateTime(2020, 7, 2, 14, 32, 34, 719, DateTimeKind.Local).AddTicks(939), "Sweltering", 35 });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 10, new DateTime(2020, 7, 2, 14, 32, 34, 719, DateTimeKind.Local).AddTicks(943), "Scorching", 40 });

            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "Id", "BoardId", "Description", "Title" },
                values: new object[] { 1, 1, "Random Description", "Random Title" });

            migrationBuilder.CreateIndex(
                name: "IX_Notes_BoardId",
                table: "Notes",
                column: "BoardId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notes");

            migrationBuilder.DropTable(
                name: "WeatherForecasts");

            migrationBuilder.DropTable(
                name: "Boards");
        }
    }
}
