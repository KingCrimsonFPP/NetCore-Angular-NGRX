export class RandomId
{
    static Generate(): number 
    {
      return Math.floor(Math.random()*100)+1;        
    }
}