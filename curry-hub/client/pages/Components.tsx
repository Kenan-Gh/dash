import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { MainLayout } from '@/layouts/MainLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { Calendar, Upload, FileText, ChevronDown } from 'lucide-react';

const SELECT_OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'next', label: 'Next.js' },
];

export default function Components() {
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const [switchEnabled, setSwitchEnabled] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState('option1');
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [singleSelect, setSingleSelect] = useState('react');
  const [multiSelect, setMultiSelect] = useState<string[]>(['react']);
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [singleSelectOpen, setSingleSelectOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileSelected(file);
      toast.success(`File "${file.name}" uploaded successfully!`);
    }
  };

  const mockTableData = [
    { id: 1, name: 'John Doe', status: 'Active', role: 'Admin' },
    { id: 2, name: 'Jane Smith', status: 'Active', role: 'Manager' },
    { id: 3, name: 'Bob Johnson', status: 'Inactive', role: 'User' },
  ];

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Component Showcase</h1>
            <p className="text-muted-foreground mt-1">
              Browse and test all available UI components in your dashboard
            </p>
          </div>

          {/* Inputs Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              Input Components
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Text Input</CardTitle>
                  <CardDescription>Standard text input field</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Label htmlFor="text-input">Enter text</Label>
                  <Input
                    id="text-input"
                    placeholder="Type something..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">You typed: {inputValue || 'nothing yet'}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Input</CardTitle>
                  <CardDescription>Email type input field</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Label htmlFor="email-input">Email address</Label>
                  <Input id="email-input" type="email" placeholder="your@email.com" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password Input</CardTitle>
                  <CardDescription>Masked password field</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Label htmlFor="password-input">Password</Label>
                  <Input id="password-input" type="password" placeholder="••••••••" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Number Input</CardTitle>
                  <CardDescription>Numeric input field</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Label htmlFor="number-input">Enter a number</Label>
                  <Input id="number-input" type="number" placeholder="0" />
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Buttons Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              Button Components
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>Different button styles and states</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button disabled>Disabled</Button>
                  <Button onClick={() => toast.success('Button clicked!')}>
                    With Toast
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Dropdowns Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              Select Components
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Basic Select */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Select</CardTitle>
                  <CardDescription>Standard dropdown menu</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="max-w-xs">
                    <Label htmlFor="select">Choose an option</Label>
                    <Select value={selectedOption} onValueChange={setSelectedOption}>
                      <SelectTrigger id="select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                        <SelectItem value="option4">Option 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Selected: <span className="font-semibold">{selectedOption}</span>
                  </p>
                </CardContent>
              </Card>

              {/* Single Select with Combobox */}
              <Card>
                <CardHeader>
                  <CardTitle>Single Select</CardTitle>
                  <CardDescription>Searchable dropdown with combobox</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Popover open={singleSelectOpen} onOpenChange={setSingleSelectOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={singleSelectOpen}
                        className="w-full justify-between"
                      >
                        {singleSelect
                          ? SELECT_OPTIONS.find((opt) => opt.value === singleSelect)?.label
                          : 'Select framework...'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search frameworks..." />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {SELECT_OPTIONS.map((option) => (
                              <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={(currentValue) => {
                                  setSingleSelect(currentValue === singleSelect ? '' : currentValue);
                                  setSingleSelectOpen(false);
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    singleSelect === option.value ? 'opacity-100' : 'opacity-0'
                                  }`}
                                />
                                {option.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <p className="text-sm text-muted-foreground">
                    Selected: <span className="font-semibold">{singleSelect || 'None'}</span>
                  </p>
                </CardContent>
              </Card>

              {/* Multi Select */}
              <Card>
                <CardHeader>
                  <CardTitle>Multi-Select</CardTitle>
                  <CardDescription>Select multiple options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Label>Frameworks</Label>
                    <div className="border rounded-lg p-3 space-y-2">
                      {SELECT_OPTIONS.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`multi-${option.value}`}
                            checked={multiSelect.includes(option.value)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setMultiSelect([...multiSelect, option.value]);
                              } else {
                                setMultiSelect(multiSelect.filter((v) => v !== option.value));
                              }
                            }}
                          />
                          <Label htmlFor={`multi-${option.value}`} className="cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {multiSelect.map((value) => (
                      <Badge
                        key={value}
                        variant="secondary"
                        className="cursor-pointer hover:bg-secondary/80"
                        onClick={() => setMultiSelect(multiSelect.filter((v) => v !== value))}
                      >
                        {SELECT_OPTIONS.find((opt) => opt.value === value)?.label}
                        <span className="ml-1">×</span>
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {multiSelect.length} selected (click badges to remove)
                  </p>
                </CardContent>
              </Card>

              {/* Autocomplete */}
              <Card>
                <CardHeader>
                  <CardTitle>Autocomplete</CardTitle>
                  <CardDescription>Search and select with autocomplete</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Popover open={autocompleteOpen} onOpenChange={setAutocompleteOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={autocompleteOpen}
                        className="w-full justify-start text-muted-foreground"
                      >
                        {autocompleteValue
                          ? SELECT_OPTIONS.find((opt) => opt.value === autocompleteValue)?.label
                          : 'Search and select...'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Type to search..."
                          value={autocompleteValue}
                        />
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {SELECT_OPTIONS.filter((option) =>
                              option.label
                                .toLowerCase()
                                .includes(autocompleteValue.toLowerCase())
                            ).map((option) => (
                              <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={(currentValue) => {
                                  setAutocompleteValue(currentValue);
                                  setAutocompleteOpen(false);
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    autocompleteValue === option.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  }`}
                                />
                                {option.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <p className="text-sm text-muted-foreground">
                    Selected: <span className="font-semibold">{autocompleteValue || 'None'}</span>
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Toggle & Switch Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              Toggles & Switches
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Switch Toggle</CardTitle>
                  <CardDescription>On/off toggle switch</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="switch">Enable notifications</Label>
                    <Switch
                      id="switch"
                      checked={switchEnabled}
                      onCheckedChange={setSwitchEnabled}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Status: {switchEnabled ? 'Enabled' : 'Disabled'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Checkbox</CardTitle>
                  <CardDescription>Check/uncheck option</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="checkbox"
                      checked={checkboxChecked}
                      onCheckedChange={setCheckboxChecked}
                    />
                    <Label htmlFor="checkbox">I agree to terms and conditions</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Checked: {checkboxChecked ? 'Yes' : 'No'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Radio Group</CardTitle>
                  <CardDescription>Select one option from group</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue="option1">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="option1" id="radio1" />
                      <Label htmlFor="radio1">Option 1</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="option2" id="radio2" />
                      <Label htmlFor="radio2">Option 2</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="option3" id="radio3" />
                      <Label htmlFor="radio3">Option 3</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* File Upload Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              File Upload
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>File Uploader</CardTitle>
                <CardDescription>Upload and preview files</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="file-input">Choose file</Label>
                  <Input
                    id="file-input"
                    type="file"
                    onChange={handleFileChange}
                    className="mt-2"
                  />
                </div>

                {fileSelected && (
                  <div className="p-4 border rounded-lg bg-accent/50">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{fileSelected.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(fileSelected.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Tables Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              Table Component
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Data Table</CardTitle>
                <CardDescription>Structured data display</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Role</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTableData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-medium">{row.name}</TableCell>
                          <TableCell>
                            <Badge
                              variant={row.status === 'Active' ? 'default' : 'secondary'}
                            >
                              {row.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{row.role}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Dialogs & Modals Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              Dialogs & Modals
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Dialog Component</CardTitle>
                  <CardDescription>Modal dialog for user interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Dialog Title</DialogTitle>
                        <DialogDescription>
                          This is a modal dialog component. Click outside or press ESC to close.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-sm">Dialog content goes here.</p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <DialogTrigger asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogTrigger>
                        <Button>Confirm</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Drawer Component</CardTitle>
                  <CardDescription>Side drawer for additional content</CardDescription>
                </CardHeader>
                <CardContent>
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button>Open Drawer</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Drawer Title</DrawerTitle>
                        <DrawerDescription>This is a side drawer component.</DrawerDescription>
                      </DrawerHeader>
                      <div className="p-4">
                        <p className="text-sm">Drawer content goes here.</p>
                      </div>
                      <DrawerFooter>
                        <Button>Confirm</Button>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Accordion/Collapse Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              Accordion
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Collapsible Accordion</CardTitle>
                <CardDescription>Expandable content sections</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item1">
                    <AccordionTrigger>What is this component?</AccordionTrigger>
                    <AccordionContent>
                      An accordion is a vertically stacked set of interactive headings that each reveal a section of content.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item2">
                    <AccordionTrigger>When should I use it?</AccordionTrigger>
                    <AccordionContent>
                      Use accordions when you have limited space and need to organize content into categories.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item3">
                    <AccordionTrigger>Can I customize it?</AccordionTrigger>
                    <AccordionContent>
                      Yes! Accordions are highly customizable with Tailwind CSS and can be styled to match your design.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Badges & Avatars Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              Badges & Avatars
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Badge Component</CardTitle>
                  <CardDescription>Labels and status indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Avatar Component</CardTitle>
                  <CardDescription>User profile images</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Toast/Notifications Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              Notifications
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Toast Notifications</CardTitle>
                <CardDescription>Display temporary notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => toast.success('Success notification!')}
                    variant="outline"
                  >
                    Success
                  </Button>
                  <Button
                    onClick={() => toast.error('Error notification!')}
                    variant="destructive"
                  >
                    Error
                  </Button>
                  <Button onClick={() => toast.info('Info notification!')} variant="outline">
                    Info
                  </Button>
                  <Button
                    onClick={() => toast.loading('Loading...')}
                    variant="outline"
                  >
                    Loading
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Colors Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              Color Palette
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Theme Colors</CardTitle>
                <CardDescription>Available colors in your design system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-primary"></div>
                    <p className="text-xs font-medium text-center">Primary</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-secondary"></div>
                    <p className="text-xs font-medium text-center">Secondary</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-destructive"></div>
                    <p className="text-xs font-medium text-center">Destructive</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-accent"></div>
                    <p className="text-xs font-medium text-center">Accent</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-muted"></div>
                    <p className="text-xs font-medium text-center">Muted</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg border-2 border-border"></div>
                    <p className="text-xs font-medium text-center">Border</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-background border-2 border-foreground"></div>
                    <p className="text-xs font-medium text-center">Background</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-foreground"></div>
                    <p className="text-xs font-medium text-center">Foreground</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
