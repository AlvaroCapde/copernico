<script lang="js">
  import { DateTime } from 'luxon';
  import { get } from 'lodash-es';

  export let row, column, rowIndex, columnIndex;

  let date = '--';
  let temp;
  $: {
    temp = get(row, column.field, false);
    if (temp) {
      date = DateTime.fromJSDate(temp).toFormat(column.format || 'MM/dd/yyyy');
    }
  }
</script>

<span>{date}</span>
