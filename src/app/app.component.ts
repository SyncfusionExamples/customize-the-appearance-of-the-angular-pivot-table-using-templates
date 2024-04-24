
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PivotViewModule } from '@syncfusion/ej2-angular-pivotview';
import { PivotFieldListModule,ConditionalFormattingService,ToolbarService } from '@syncfusion/ej2-angular-pivotview';
import { IDataOptions, PivotView, IAxisSet, IDataSet,ToolbarItems } from '@syncfusion/ej2-angular-pivotview';
import { renewableEnergy } from './data';

@Component({
    standalone: true,
    imports: [RouterOutlet, PivotViewModule, PivotFieldListModule],
    providers: [ConditionalFormattingService,ToolbarService],
    selector: 'app-root',
    styleUrls: ['app.component.css'],
    templateUrl: 'app.component.html',
})
export class AppComponent {
    public dataSourceSettings?: IDataOptions ;
    public cellTemplate?: string ;
     public toolbarOptions?: ToolbarItems[];
   @ViewChild('pivotview')
   public pivotObj?: PivotView;
    
    trend(): void {
        let cTable: HTMLElement[] = [].slice.call(document.getElementsByClassName("e-table"));    
           Array.from(cTable[1].children[1].children).forEach((row: Element) => {
           Array.from(row.childNodes).forEach((node: Node, j: number) => {
                let ri: any = (node as HTMLElement).getAttribute("index");
                let currentValue: number = ((this.pivotObj?.pivotValues[ri][j] as IAxisSet) as any).value;
                    if ((node as HTMLElement).querySelector('.tempwrap')) {
                        let trendElement: HTMLElement | any = (node as HTMLElement).querySelector('.tempwrap');
                        trendElement.className = 'tempwrap pv-icons';
                        trendElement.className += (currentValue > 175) ? ' sb-icon-profit' :
                                                (currentValue > 100) ? ' sb-icon-neutral' :
                                                (currentValue > 0) ? ' sb-icon-loss' : '';
                    }
            })
           });  
    }


  ngOnInit(): void {
         this.toolbarOptions = ['ConditionalFormatting'] as ToolbarItems[];
         this.cellTemplate = '<span class="tempwrap sb-icon-neutral pv-icons"></span>';
       
        this.dataSourceSettings = {
            dataSource: renewableEnergy as IDataSet[],
            expandAll: true,
            formatSettings: [{ name: 'ProCost', format: 'C0' }],
            rows: [
                { name: 'Year', caption: 'Production Year' },
                { name: 'HalfYear', caption: 'Half Year' }
            ],
            columns: [
                { name: 'EnerType', caption: 'Energy Type' },
                { name: 'EneSource', caption: 'Energy Source' }
            ],
            values: [
                { name: 'PowUnits', caption: 'Power Units'},
                { name: 'ProCost', caption: 'Revenue Growth' }
            ],
           
            conditionalFormatSettings: [
              {
                  //measure: 'ProCost',
                  value1: 100,
                  conditions: 'LessThan',
                  style: {
                      backgroundColor: 'yellow',
                      color: 'red',
                      fontFamily: 'Tahoma',
                      fontSize: '12px'
                  }
              },
             
          ]
      
        };
    }
}
