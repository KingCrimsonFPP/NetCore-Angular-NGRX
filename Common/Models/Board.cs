using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AssessmentPreparation.Common.Models
{
    public class Board
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(50)]
        public string Title { get; set; }
        public ICollection<Note> Notes { get; set; }
        public DateTime Date { get; set; }
    }
}
