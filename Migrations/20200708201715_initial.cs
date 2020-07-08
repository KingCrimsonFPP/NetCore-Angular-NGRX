using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NetCoreAngularNgrx.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Board",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(maxLength: 50, nullable: true),
                    Date = table.Column<DateTime>(nullable: false, defaultValue: new DateTime(2020, 7, 8, 15, 17, 15, 78, DateTimeKind.Local).AddTicks(2885))
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Board", x => x.Id);
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
                name: "Note",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(maxLength: 50, nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false, defaultValue: new DateTime(2020, 7, 8, 15, 17, 15, 81, DateTimeKind.Local).AddTicks(9679)),
                    BoardId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Note", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Note_Board_BoardId",
                        column: x => x.BoardId,
                        principalTable: "Board",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Board",
                columns: new[] { "Id", "Title" },
                values: new object[] { 1, "Board1" });

            migrationBuilder.InsertData(
                table: "Board",
                columns: new[] { "Id", "Title" },
                values: new object[] { 2, "Board2" });

            migrationBuilder.InsertData(
                table: "Board",
                columns: new[] { "Id", "Title" },
                values: new object[] { 3, "Board3" });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 1, new DateTime(2020, 7, 8, 15, 17, 15, 65, DateTimeKind.Local).AddTicks(6193), "Freezing", 0 });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 2, new DateTime(2020, 7, 8, 15, 17, 15, 70, DateTimeKind.Local).AddTicks(9481), "Bracing", 5 });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 3, new DateTime(2020, 7, 8, 15, 17, 15, 70, DateTimeKind.Local).AddTicks(9587), "Chilly", 10 });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 4, new DateTime(2020, 7, 8, 15, 17, 15, 70, DateTimeKind.Local).AddTicks(9596), "Cool", 15 });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 5, new DateTime(2020, 7, 8, 15, 17, 15, 70, DateTimeKind.Local).AddTicks(9602), "Mild", 20 });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 6, new DateTime(2020, 7, 8, 15, 17, 15, 70, DateTimeKind.Local).AddTicks(9607), "Warm", 25 });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 7, new DateTime(2020, 7, 8, 15, 17, 15, 70, DateTimeKind.Local).AddTicks(9612), "Balmy", 27 });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 8, new DateTime(2020, 7, 8, 15, 17, 15, 70, DateTimeKind.Local).AddTicks(9617), "Hot", 30 });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 9, new DateTime(2020, 7, 8, 15, 17, 15, 70, DateTimeKind.Local).AddTicks(9623), "Sweltering", 35 });

            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 10, new DateTime(2020, 7, 8, 15, 17, 15, 70, DateTimeKind.Local).AddTicks(9628), "Scorching", 40 });

            migrationBuilder.InsertData(
                table: "Note",
                columns: new[] { "Id", "BoardId", "Description", "Title" },
                values: new object[] { 1, 1, "Random Description", "Random Title" });

            migrationBuilder.CreateIndex(
                name: "IX_Note_BoardId",
                table: "Note",
                column: "BoardId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Note");

            migrationBuilder.DropTable(
                name: "WeatherForecasts");

            migrationBuilder.DropTable(
                name: "Board");
        }
    }
}
