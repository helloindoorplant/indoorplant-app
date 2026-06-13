'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 5000]);

  return (
    <div className="w-full space-y-2">
      <div className="mb-6 hidden lg:block">
        <h2 className="text-2xl font-bold tracking-tight mb-4 text-[#1B4332]">Filters</h2>
        <div className="h-1 w-12 bg-primary rounded-full" />
      </div>

      <Accordion defaultValue={["price", "sunlight", "maintenance", "size"]} className="w-full">
        {/* Price Filter */}
        <AccordionItem value="price" className="border-border/40">
          <AccordionTrigger className="text-lg font-bold hover:no-underline tracking-tight">Price Range</AccordionTrigger>
          <AccordionContent className="pt-4 pb-6 px-1">
            <Slider 
              defaultValue={[0, 5000]} 
              max={5000} 
              step={100} 
              value={priceRange}
              onValueChange={(val) => setPriceRange(val as number[])}
              className="mb-8 mt-2"
            />
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1">Min Price</span>
                <span className="text-sm font-bold px-4 py-2 bg-white border border-border/60 rounded-lg shadow-sm">₹{priceRange[0]}</span>
              </div>
              <div className="w-4 h-[2px] bg-border/60 mt-5" />
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1">Max Price</span>
                <span className="text-sm font-bold px-4 py-2 bg-white border border-border/60 rounded-lg shadow-sm">₹{priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Sunlight Filter */}
        <AccordionItem value="sunlight" className="border-border/40">
          <AccordionTrigger className="text-lg font-bold hover:no-underline tracking-tight">Sunlight</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              {['Low', 'Bright Indirect', 'Direct'].map((item) => (
                <div key={item} className="flex items-center space-x-3 group">
                  <Checkbox id={`sunlight-${item}`} className="h-5 w-5 rounded-[6px] border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-colors" />
                  <label htmlFor={`sunlight-${item}`} className="text-[15px] font-medium leading-none cursor-pointer group-hover:text-primary transition-colors">
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Maintenance Filter */}
        <AccordionItem value="maintenance" className="border-border/40">
          <AccordionTrigger className="text-lg font-bold hover:no-underline tracking-tight">Maintenance</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              {['Easy', 'Medium', 'High'].map((item) => (
                <div key={item} className="flex items-center space-x-3 group">
                  <Checkbox id={`maint-${item}`} className="h-5 w-5 rounded-[6px] border-primary/30 data-[state=checked]:bg-primary transition-colors" />
                  <label htmlFor={`maint-${item}`} className="text-[15px] font-medium leading-none cursor-pointer group-hover:text-primary transition-colors">
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Size Filter */}
        <AccordionItem value="size" className="border-border/40">
          <AccordionTrigger className="text-lg font-bold hover:no-underline tracking-tight">Plant Size</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              {['Small', 'Medium', 'Large'].map((item) => (
                <div key={item} className="flex items-center space-x-3 group">
                  <Checkbox id={`size-${item}`} className="h-5 w-5 rounded-[6px] border-primary/30 data-[state=checked]:bg-primary transition-colors" />
                  <label htmlFor={`size-${item}`} className="text-[15px] font-medium leading-none cursor-pointer group-hover:text-primary transition-colors">
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Pet Friendly */}
        <AccordionItem value="pet" className="border-border/40 border-b-0">
          <AccordionTrigger className="text-lg font-bold hover:no-underline tracking-tight">Pet Friendly</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-3 group">
                <Checkbox id="pet-yes" className="h-5 w-5 rounded-[6px] border-primary/30 data-[state=checked]:bg-primary transition-colors" />
                <label htmlFor="pet-yes" className="text-[15px] font-medium leading-none cursor-pointer group-hover:text-primary transition-colors">Yes, Pet Safe Only</label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
