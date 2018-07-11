import { Util } from '@/utils/Util';



export class ResolverUtil {

    public static mergeErrors(source1: string | string[], source2: string | string[]): string[] {
        if (Util.isString(source1) && Util.isString(source2)) {
          return <string[]> [ source1, source2 ];
        } else if (Util.isString(source1) && Util.isArray(source2)) {
          return <string[]> [ source1, ...( <string[]> source2) ];
        } else if (Util.isArray(source1) && Util.isString(source2)) {
          return <string[]> [...(<string[]> source1), source2 ];
        } else if (Util.isArray(source1) && Util.isArray(source2)) {
          return <string[]> [...(<string[]> source1), ...(<string[]> source2) ];
        }
      }

}