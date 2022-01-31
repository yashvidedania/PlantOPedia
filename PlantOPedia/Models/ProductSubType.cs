using System.Text.Json.Serialization;

namespace PlantOPedia.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ProductSubType
    {
        VegitablesSeeds=0,
        FlowersSeeds=1,
        HerbsSeed=2,
        FruiteSeeds=3,
        Artificial=4,
        Natural=5,
        DecoreType=6,
        ForWellness=7,
        Office=8,
        ForBalcony=9,
        Indors=10
    }
}
