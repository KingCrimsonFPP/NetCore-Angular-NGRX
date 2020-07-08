using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetCoreAngularNgrx.Common.Models
{
    [Table(nameof(Board))]
    public class Board
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [MaxLength(50)]
        public string Title { get; set; }
        public ICollection<Note> Notes { get; set; } = new HashSet<Note>();
        public DateTime Date { get; set; }
    }
}
