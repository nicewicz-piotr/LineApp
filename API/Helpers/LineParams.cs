namespace API.Helpers
{
    public class LineParams : PaginationParams
    {
        public int CurrentLineId { get; set; }    
        public string LineSymbol { get; set; }    
        public string OrderBy { get; set; } = "currentLineId";

    }
}