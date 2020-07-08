using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetCoreAngularNgrx.Common.Models
{
    [Table(nameof(Note))]
    public class Note
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [MaxLength(50)]
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }

        //One-To-Many
        [Required]
        [ForeignKey(nameof(Board))]
        public int BoardId { get; set; }
    }
}
