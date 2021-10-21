namespace API.Helpers
{
    public class LineParams : PaginationParams
    {
        public int CurrentLineId { get; set; }    
        public string SearchText { get; set ;}
        public string SearchBy { get; set; }
        public string OrderBy { get; set; } //= "currentLineId";

    }
}