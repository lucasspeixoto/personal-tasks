import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [],
  imports: [
    ProgressSpinnerModule,
    OverlayPanelModule,
    ScrollPanelModule,
    SplitButtonModule,
    InputTextModule,
    PaginatorModule,
    MessagesModule,
    CheckboxModule,
    FieldsetModule,
    SidebarModule,
    MessageModule,
    MenubarModule,
    ButtonModule,
    DialogModule,
    SliderModule,
    ToastModule,
    TableModule,
    StepsModule,
    CardModule,
    TabViewModule,
    FileUploadModule,
    TooltipModule,
    RadioButtonModule,
    InputMaskModule,
    AutoCompleteModule,
    MultiSelectModule,
    ChipsModule,
    DropdownModule,
  ],
  exports: [
    ProgressSpinnerModule,
    OverlayPanelModule,
    ScrollPanelModule,
    SplitButtonModule,
    InputTextModule,
    PaginatorModule,
    MessagesModule,
    CheckboxModule,
    FieldsetModule,
    SidebarModule,
    MessageModule,
    MenubarModule,
    ButtonModule,
    DialogModule,
    SliderModule,
    ToastModule,
    TableModule,
    StepsModule,
    CardModule,
    TabViewModule,
    FileUploadModule,
    TooltipModule,
    RadioButtonModule,
    InputMaskModule,
    AutoCompleteModule,
    MultiSelectModule,
    ChipsModule,
    DropdownModule,
  ],
  providers: [MessageService],
})
export class PrimeNgModule {}
