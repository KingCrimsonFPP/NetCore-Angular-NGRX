using System;
using System.ComponentModel.DataAnnotations;

namespace AssessmentPreparation.Common.Models
{
    public class Note
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(50)]
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }

        //One-To-Many
        [Required]
        public Board Board { get; set; }
        public int BoardId { get; set; }
    }
}
